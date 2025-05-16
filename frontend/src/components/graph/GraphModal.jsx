import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useGraphService } from '../../api/Graph.api';
import { useSearchData } from '../../context/SearchContext';

function parseGraphData(data) {
  const nodesMap = new Map();
  const links = [];

  function traverse(node, depth = 0) {
    if (!nodesMap.has(node.id)) {
      nodesMap.set(node.id, {
        id: node.id,
        title: node.title,
        url: node.url,
        depth,
      });
    }

    if (node.connections && node.connections.length > 0) {
      node.connections.forEach((child) => {
        links.push({ source: node.id, target: child.id });
        traverse(child, depth + 1);
      });
    }
  }

  traverse(data);
  return { nodes: Array.from(nodesMap.values()), links };
}

export const GraphModal = () => {
  const calculateWidth = () => {
    const width = window.innerWidth;
    return width / 2.635 > 200 ? width / 2.635 : width;
  };
  
  const { indexMenuContent } = useSearchData();
  const fgRef = useRef();
  const [rawData, setRawData] = useState({});
  const { nodes, links } = parseGraphData(rawData);
  const { getGraph } = useGraphService();

  const [windowWidth, setWindowWidth] = useState(calculateWidth());

  const handleResize = () => {
    setWindowWidth(calculateWidth());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("Largura atual:", windowWidth);
  }, [windowWidth]);

  useEffect(() => {
    console.log("Largura atual:", windowWidth);
  }, [windowWidth]);

  useEffect(() => {
    const fetchGraph = async () => {
      const data = await getGraph(indexMenuContent.id, 2);
      setRawData(data);
    };
  
    fetchGraph();
  }, [indexMenuContent.id]); 

  return (
    <div style={{
      maxWidth: '100%',
      maxHeight: '100%',
      overflow: 'hidden',
    }}>
      <ForceGraph2D
        ref={fgRef}
        width={windowWidth}
        height={500}
        graphData={{ nodes, links }}
        nodeLabel={(node) => node.title}
        nodeCanvasObject={(node, ctx, globalScale) => {
          if (typeof node.x !== 'number' || typeof node.y !== 'number') return;

          const label = node.title;
          const fontSize = 14 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;

          const textWidth = ctx.measureText(label).width;
          const padding = 6;
          const boxWidth = textWidth + padding * 0.2;
          const boxHeight = fontSize + padding * 0.2;

          
          let backgroundColor = 'rgba(255, 255, 255, 0.9)';

          if (node.depth === 0) {
            backgroundColor = 'rgba(255, 255, 0, 0.9)'; 
          } else if (node.depth === 1) {
            backgroundColor = 'rgba(173, 216, 230, 0.9)'; 
          } else {
            backgroundColor = 'rgba(230, 230, 230, 0.9)';
          }

          ctx.fillStyle = backgroundColor;
          ctx.lineWidth = 1.5;

          ctx.beginPath();
          ctx.roundRect(node.x - boxWidth / 2, node.y - boxHeight / 2, boxWidth, boxHeight, 4);
          ctx.fill();

          ctx.fillStyle = 'black';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(label, node.x, node.y);
        }}
        linkColor={() => '#666'}
        linkDirectionalParticles={0.4}
        linkDirectionalParticleSpeed={0.005}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0}
        cooldownTicks={250}
        onNodeClick={(node) => {
          window.open(node.url, '_blank');
        }}
      />
    </div>
  );
};
