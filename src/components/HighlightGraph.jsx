import React from "react";
import ReactDOM from "react-dom";
import { ForceGraph2D } from 'react-force-graph';
import genRandomTree from './random-data';

export default function HighlightGraph() {
    const { useMemo, useState, useCallback, useRef } = React;

    const [width, setWidth] = useState(850);

    const NODE_R = 8;
    const fgRef = useRef();

    window.addEventListener('resize', function(resize) {
      if (resize.currentTarget.innerWidth < 950) {
        setWidth(400)
      } else {
        setWidth(850)
      }
    });

    const HighlightGraph = () => {
      const data = useMemo(() => {
        const gData = genRandomTree(80);

        // cross-link node objects
        gData.links.forEach(link => {
          const a = gData.nodes[link.source];
          const b = gData.nodes[link.target];
          !a.neighbors && (a.neighbors = []);
          !b.neighbors && (b.neighbors = []);
          a.neighbors.push(b);
          b.neighbors.push(a);

          !a.links && (a.links = []);
          !b.links && (b.links = []);
          a.links.push(link);
          b.links.push(link);
        });

        return gData;
      }, []);

      const [highlightNodes, setHighlightNodes] = useState(new Set());
      const [highlightLinks, setHighlightLinks] = useState(new Set());
      const [hoverNode, setHoverNode] = useState(null);

      const updateHighlight = () => {
        setHighlightNodes(highlightNodes);
        setHighlightLinks(highlightLinks);
      };

      const handleNodeHover = node => {
        highlightNodes.clear();
        highlightLinks.clear();
        if (node) {
          highlightNodes.add(node);
          node.neighbors.forEach(neighbor => highlightNodes.add(neighbor));
          node.links.forEach(link => highlightLinks.add(link));
        }

        setHoverNode(node || null);
        updateHighlight();
      };

      const handleLinkHover = link => {
        highlightNodes.clear();
        highlightLinks.clear();

        if (link) {
          highlightLinks.add(link);
          highlightNodes.add(link.source);
          highlightNodes.add(link.target);
        }

        updateHighlight();
      };

      const paintRing = useCallback((node, ctx) => {
        // add ring just for highlighted nodes
        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);
        ctx.fillStyle = node === hoverNode ? 'red' : 'orange';
        ctx.fill();
      }, [hoverNode]);
      return <ForceGraph2D
        graphData={data}
        nodeRelSize={NODE_R}
        autoPauseRedraw={false}
        linkWidth={link => highlightLinks.has(link) ? 5 : 1}
        linkDirectionalParticles={4}
        linkDirectionalParticleWidth={link => highlightLinks.has(link) ? 4 : 0}
        nodeCanvasObjectMode={node => highlightNodes.has(node) ? 'before' : undefined}
        nodeCanvasObject={paintRing}
        onNodeHover={handleNodeHover}
        onLinkHover={handleLinkHover}
        width={width}
        height={500}
        backgroundColor='#E2DFD2'
        cooldownTicks={100}
        ref={fgRef}
      />;
    };

    return <HighlightGraph />

}
