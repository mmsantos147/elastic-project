import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { useGraphService } from '../../api/Graph.api';

// Componente de grafo com física estabilizada
const Graph = ({ data }) => {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 1400, height: 900 });
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [simulation, setSimulation] = useState(null);

  // Configurações do grafo
  const [settings, setSettings] = useState({
    repelForce: -600,
    centerForce: 0.8,
    linkDistance: 30,
    nodeSize: 4,
    focusOnHover: true,
    showLabels: true,
    clusterByGroup: false,
  });

  // Medir o container SVG
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });

    const container = svgRef.current?.parentElement;
    if (container) {
      resizeObserver.observe(container);
    }

    return () => {
      if (container) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  // Função para determinar a cor do nó baseada na profundidade
  const getNodeColor = (depth) => {
    const colors = [
      '#ff6347', // Nó principal (camada 0) - vermelho
      '#4682b4', // Camada 1 - azul
      '#2e8b57', // Camada 2 - verde
      '#9932cc', // Camada 3 - roxo
      '#ff8c00'  // Camada 4+ - laranja
    ];
    
    if (depth === 0) return colors[0];
    if (depth >= colors.length) return colors[colors.length - 1];
    return colors[depth];
  };

  // Posicionamento estático em círculos concêntricos 
  const getInitialNodePosition = (node, index, totalNodes) => {
    const { width, height } = dimensions;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Nó central
    if (node.depth === 0) return { x: centerX, y: centerY };
    
    // Distribuição radial baseada na profundidade
    const radius = 100 + (node.depth * 60);
    
    // Distribuir igualmente em círculo
    const nodesInLevel = data.nodes.filter(n => n.depth === node.depth).length;
    const indexInLevel = data.nodes.filter(n => n.depth === node.depth).findIndex(n => n.id === node.id);
    const angle = ((indexInLevel === -1 ? index : indexInLevel) / Math.max(1, nodesInLevel)) * 2 * Math.PI;
    
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  };

  // SOLUÇÃO PRINCIPAL PARA O GRAFO DESCENDO
  useEffect(() => {
    if (!data || !data.nodes || !data.links || data.nodes.length === 0 || !svgRef.current) {
      return;
    }

    const { width, height } = dimensions;
    
    // Posicionar todos os nós inicialmente
    const nodes = data.nodes.map((node, i) => {
      const pos = getInitialNodePosition(node, i, data.nodes.length);
      return {
        ...node,
        // IMPORTANTE: Fixar as posições Y para evitar que desçam
        x: pos.x,
        y: pos.y,
        fx: null,    // Permite movimento horizontal (controlado)
        fy: pos.y,   // FIXA a posição vertical para evitar queda
        radius: node.depth === 0 ? 8 : Math.max(settings.nodeSize + 2 - node.depth, 2)
      };
    });
    
    const links = data.links.map(link => ({
      ...link,
      value: 1 / (link.depth + 1)
    }));

    // Configurar o SVG e o zoom
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "font: 12px sans-serif; max-width: 100%; height: auto;");

    // Limpar SVG
    svg.selectAll("*").remove();
    
    // Container com zoom
    const container = svg.append("g");
    
    // Adicionar zoom
    const zoom = d3.zoom()
      .scaleExtent([0.1, 8])
      .on("zoom", (event) => {
        container.attr("transform", event.transform);
      });
    
    svg.call(zoom);
    
    // Configurar links primeiro (para ficarem abaixo dos nós)
    const link = container.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.5)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", d => Math.max(1.5 - (d.depth * 0.3), 0.5))
      .attr("opacity", 0.6);
    
    // Configurar nós
    const node = container.append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", d => d.radius)
      .attr("fill", d => getNodeColor(d.depth))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .attr("cursor", "pointer")
      .call(drag()); 
    
    // Adicionar tooltips para nós (estilo Quartz)
    const tooltip = d3.select("body").append("div")
      .attr("class", "quartz-graph-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("padding", "8px")
      .style("background", "rgba(0,0,0,0.75)")
      .style("border-radius", "6px")
      .style("color", "#fff")
      .style("font-size", "12px")
      .style("pointer-events", "none");
    
    // Rótulos para nós (limitados aos principais)
    const labels = container.append("g")
      .attr("class", "node-labels")
      .style("pointer-events", "none")
      .selectAll("text")
      .data(nodes.filter(d => settings.showLabels && (d.depth <= 1 || d.isSelected || d === hoveredNode)))
      .join("text")
      .text(d => d.label)
      .attr("font-size", d => d.depth === 0 ? 11 : 9)
      .attr("fill", "#333")
      .attr("text-anchor", "middle")
      .attr("dy", d => -d.radius - 5)
      .attr("opacity", d => d.depth === 0 ? 1 : 0.8);
    
    // Adicionar eventos de interação
    node
      .on("mouseover", function(event, d) {
        setHoveredNode(d);
        
        // Mostrar tooltip
        tooltip.html(`<strong>${d.label}</strong>${d.depth > 0 ? `<br>Profundidade: ${d.depth}` : ''}`)
          .style("visibility", "visible")
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
        
        // Destacar nó e conexões
        if (settings.focusOnHover) {
          node.attr("opacity", n => isConnected(d, n) ? 1 : 0.2);
          link.attr("opacity", l => isLinkConnected(l, d) ? 1 : 0.05);
          labels.attr("opacity", n => isConnected(d, n) ? 1 : 0.1);
        }
      })
      .on("mouseout", function() {
        setHoveredNode(null);
        
        // Esconder tooltip
        tooltip.style("visibility", "hidden");
        
        // Restaurar visualização normal
        if (settings.focusOnHover) {
          node.attr("opacity", n => n === selectedNode ? 1 : 0.8);
          link.attr("opacity", 0.6);
          labels.attr("opacity", d => d.depth === 0 ? 1 : 0.8);
        }
      })
      .on("click", function(event, d) {
        event.stopPropagation();
        
        // Selecionar ou desselecionar nó
        if (selectedNode === d) {
          setSelectedNode(null);
        } else {
          setSelectedNode(d);
          
          // Centralizar no nó selecionado
          const transform = d3.zoomIdentity
            .translate(width/2 - d.x * 2, height/2 - d.y * 2)
            .scale(2);
          
          svg.transition().duration(500).call(zoom.transform, transform);
        }
      });
    
    // Auxiliar para verificar se dois nós estão conectados
    function isConnected(a, b) {
      if (a === b) return true;
      return links.some(l => 
        (l.source === a && l.target === b) || 
        (l.target === a && l.source === b) ||
        (l.source.id === a.id && l.target.id === b.id) ||
        (l.source.id === b.id && l.target.id === a.id)
      );
    }
    
    // Auxiliar para verificar se um link está conectado a um nó
    function isLinkConnected(l, node) {
      return (l.source === node || l.target === node || 
             l.source.id === node.id || l.target.id === node.id);
    }
    
    // Configurar simulação D3 - SIMULAÇÃO MODIFICADA
    const sim = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links)
        .id(d => d.id)
        .distance(d => settings.linkDistance + (d.source.depth * 5)))
      .force("charge", d3.forceManyBody()
        .strength(d => d.depth === 0 ? settings.repelForce * 2 : settings.repelForce)
        .distanceMax(300))
      .force("centerX", d3.forceX(width / 2).strength(0.2)) // Força horizontal mais forte
      .force("centerY", d3.forceY(height / 2).strength(0.05)) // Força vertical muito mais fraca
      .force("collision", d3.forceCollide().radius(d => d.radius * 2.5))
      .velocityDecay(0.6) // Maior atrito para desacelerar movimento
      .alphaDecay(0.02)
      .alphaMin(0.001)
      .alpha(0.5); // Alpha inicial mais baixo
    
    // Forçar parada após aquecimento inicial
    setTimeout(() => {
      sim.alpha(0).stop();
      
      // SOLUÇÃO EXTREMA: Depois de posicionar, fixar TODOS os nós
      nodes.forEach(node => {
        node.fx = node.x; 
        node.fy = node.y;
      });
      
      // Atualizar posições finais
      updatePositions();
    }, 2000);
    
    // Função para atualizar posições a cada tick
    function updatePositions() {
      // Atualizar posições dos links
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      
      // Atualizar posições dos nós (com limites)
      node
        .attr("cx", d => d.x = Math.max(d.radius, Math.min(width - d.radius, d.x)))
        .attr("cy", d => d.y = Math.max(d.radius, Math.min(height - d.radius, d.y)));
      
      // Atualizar posições dos rótulos
      labels
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    }
    
    sim.on("tick", updatePositions);
    
    // Salvar simulação para referência externa
    setSimulation(sim);
    
    // Função para arrastar nós
    function drag() {
      return d3.drag()
        .on("start", (event, d) => {
          // Desbloquear o nó para arrastar
          if (!event.active) sim.alphaTarget(0.1).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          // Limitar movimento apenas na horizontal
          d.fx = Math.max(d.radius, Math.min(width - d.radius, event.x));
          d.fy = Math.max(d.radius, Math.min(height - d.radius, event.y));
        })
        .on("end", (event, d) => {
          if (!event.active) sim.alphaTarget(0);
          // Manter posição fixa após soltar para evitar deriva
          // Comentar as duas linhas abaixo se quiser que os nós voltem a se mover
          // d.fx = null;
          // d.fy = null;
        });
    }
    
    // Função de limpeza
    return () => {
      sim.stop();
      d3.select('.quartz-graph-tooltip').remove();
    };
  }, [data, dimensions, settings, hoveredNode, selectedNode]);

  // Manipuladores para controles do usuário
  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
    
    // Atualizar simulação se já existir
    if (simulation) {
      if (setting === 'repelForce') {
        simulation.force("charge").strength(value);
      } else if (setting === 'centerForce') {
        simulation.force("centerX").strength(value);
        simulation.force("centerY").strength(value * 0.25); // Reduzir força vertical
      } else if (setting === 'linkDistance') {
        simulation.force("link").distance(d => value + (d.source.depth * 5));
      }
      
      simulation.alpha(0.3).restart();
      
      // Parar após breve período de ajuste
      setTimeout(() => {
        simulation.stop();
      }, 1000);
    }
  };

  return (
    <div className="graph-container flex flex-col w-full h-full">
      <div className="controls bg-gray-100 p-3 rounded flex flex-wrap gap-4 items-center mb-4">
        <div className="control-group">
          <label className="block text-sm font-medium text-gray-700">Repulsão</label>
          <input 
            type="range" 
            min="-1000" 
            max="-100" 
            value={settings.repelForce} 
            onChange={(e) => handleSettingChange('repelForce', parseInt(e.target.value))}
            className="w-32" 
          />
          <span className="text-xs ml-1">{settings.repelForce}</span>
        </div>
        
        <div className="control-group">
          <label className="block text-sm font-medium text-gray-700">Gravidade Central</label>
          <input 
            type="range" 
            min="0.1" 
            max="2" 
            step="0.1" 
            value={settings.centerForce} 
            onChange={(e) => handleSettingChange('centerForce', parseFloat(e.target.value))}
            className="w-32" 
          />
          <span className="text-xs ml-1">{settings.centerForce}</span>
        </div>
        
        <div className="control-group">
          <label className="block text-sm font-medium text-gray-700">Distância de Links</label>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={settings.linkDistance} 
            onChange={(e) => handleSettingChange('linkDistance', parseInt(e.target.value))}
            className="w-32" 
          />
          <span className="text-xs ml-1">{settings.linkDistance}px</span>
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          <label className="flex items-center text-sm">
            <input 
              type="checkbox" 
              checked={settings.focusOnHover} 
              onChange={(e) => handleSettingChange('focusOnHover', e.target.checked)}
              className="mr-1 h-4 w-4" 
            />
            Destacar conexões
          </label>
          
          <label className="flex items-center text-sm">
            <input 
              type="checkbox" 
              checked={settings.showLabels} 
              onChange={(e) => handleSettingChange('showLabels', e.target.checked)}
              className="mr-1 h-4 w-4" 
            />
            Mostrar rótulos
          </label>
        </div>
      </div>
      
      <div className="graph-view relative flex-grow border border-gray-200 rounded overflow-hidden bg-white">
        {data.nodes.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            Sem dados para visualizar
          </div>
        ) : (
          <svg 
            ref={svgRef} 
            className="w-full h-full"
            style={{ cursor: 'grab' }}
          >
            <g className="graph"></g>
          </svg>
        )}
        
        {/* Mini legenda */}
        <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 p-2 rounded border text-xs">
          <div className="flex items-center mb-1">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span>
            <span>Nó principal</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
            <span>Conexões</span>
          </div>
        </div>
        
        {/* Instruções */}
        <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 p-2 rounded border text-xs">
          Scroll para zoom • Arraste para mover • Clique para selecionar
        </div>
      </div>
    </div>
  );
};

// O restante do componente WikipediaGraph permanece igual...

export default Graph;