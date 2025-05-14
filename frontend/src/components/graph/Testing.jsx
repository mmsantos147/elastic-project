import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Graph = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 600;
  
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);
  
    // LIMPA O CONTEÚDO ANTERIOR DO SVG
    svg.selectAll('*').remove();
  
    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));
  
    const link = svg.append('g')
      .attr('stroke', '#999')
      .selectAll('line')
      .data(data.links)
      .enter().append('line')
      .attr('stroke-width', 1.5);
  
    const node = svg.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(data.nodes)
      .enter().append('circle')
      .attr('r', 10)
      .attr('fill', 'steelblue')
      .call(drag(simulation));
  
      const labels = svg.append('g')
      .selectAll('text')
      .data(data.nodes)
      .enter().append('text')
      .text(d => d.id)
      .attr('font-size', 12)
      .attr('fill', '#ffff')
      .attr('text-anchor', 'middle')
      .attr('dy', -15);
  
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
  
      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      labels
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });
  
    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
  
      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }
  
      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
  
      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }
  
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export const Testing = () => {
    const data = {
        nodes: [
          { id: 'Raiz quadrada' },
          { id: 'Matematica' },
          { id: 'Irracional' },
        ],
        links: [
          { source: 'Raiz quadrada', target: 'Matematica' },
          { source: 'Matematica', target: 'Irracional' },
        ],
      };
    
    return (<div>
        <Graph data={data} />

    </div>)
}