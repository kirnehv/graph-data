import React, {useState} from 'react';
import ReactDOM from "react-dom";
import { ForceGraph2D, ForceGraph3D, ForceGraphVR, ForceGraphAR } from 'react-force-graph';
import data3d from './data3d';
import HighlightGraph from './HighlightGraph';
import Tree from './Tree';

export default function Graph3d() {
  const { useRef, useCallback, useMemo } = React;
  const fgRef = useRef();

  const [width, setWidth] = useState(850);

  const handleClick = useCallback(node => {
    // Aim at node from outside it
    const distance = 40;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

    fgRef.current.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      3000  // ms transition duration
    );
  }, [fgRef]);

  window.addEventListener('resize', function(resize) {
    if (resize.currentTarget.innerWidth < 950) {
      setWidth(400)
    } else {
      setWidth(850)
    }
  });

  // Handle highlight

  return (
    <div className='container'>
      <div className='left'>

      </div>
      <div className='graph3d'>
        <ForceGraph3D
          className='forceGraph3D'
          ref={fgRef}
          graphData={data3d}
          nodeLabel="id"
          nodeAutoColorBy="group"
          onNodeClick={handleClick}
          width={width}
          height={500}
          onNodeDragEnd={node => {
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;
          }}
        />

      </div>
      <div className='highlightGraph'>
        <HighlightGraph/>
      </div>
      <div className='tree'>
        <Tree/>
      </div>
      <div className='right'>

      </div>
    </div>
  );
}
