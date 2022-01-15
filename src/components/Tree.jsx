import React from "react";
import ReactDOM from "react-dom";
import { ForceGraph2D } from 'react-force-graph';
import * as dat from 'dat.gui';
import * as d3Force from 'd3-force';
import * as d3dsv from 'd3-dsv';
import csv from './d3-dependencies.csv';
import data from './nodesLinks.json';

export default function Tree() {
  const { useState, useEffect, useRef, useMemo } = React;

  const [width, setWidth] = useState(850);

  const useForceUpdate = () => {
    const setToggle = useState(false)[1];
    return () => setToggle(b => !b);
  };

  window.addEventListener('resize', function(resize) {
    if (resize.currentTarget.innerWidth < 950) {
      setWidth(400)
    } else {
      setWidth(850)
    }
  });

  const fgRef = useRef();

  const [controls] = useState({ 'DAG Orientation': null});
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    // add controls GUI
    const gui = new dat.GUI();
    gui.add(controls, 'DAG Orientation', ['td', 'bu', 'lr', 'rl', 'radialout', 'radialin', null])
      .onChange(forceUpdate);
  }, []);

  useEffect(() => {
    // add collision force
    fgRef.current.d3Force('collision', d3Force.forceCollide(node => Math.sqrt(100 / (node.level + 1))));
  }, []);

  return <ForceGraph2D
    ref={fgRef}
    graphData={data}
    dagMode={controls['DAG Orientation']}
    dagLevelDistance={300}
    backgroundColor="#101020"
    linkColor={() => 'rgba(255,255,255,0.2)'}
    nodeRelSize={1}
    nodeId="path"
    nodeVal={node => 100 / (node.level + 1)}
    nodeLabel="path"
    nodeAutoColorBy="module"
    linkDirectionalParticles={2}
    linkDirectionalParticleWidth={2}
    d3VelocityDecay={0.3}
    width={width}
    height={500}
  />;

}
