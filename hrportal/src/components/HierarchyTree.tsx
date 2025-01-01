import React from "react";
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import "./HierarchyTree.css";

interface User {
  id: number;
  name: string;
  position: string;
  color: string;
  parentId?: number;
}

const hierarchyData: User[] = [
  { id: 1, name: "Kadri Mohammed", position: "CEO", color: "#5B9BD5" },
  { id: 2, name: "Houari Nour el houda", position: "Design Manager", color: "#ED9B9B", parentId: 1 },
  { id: 3, name: "Kacemi Amira", position: "UI Designer", color: "#95D1CC", parentId: 2 },
  { id: 4, name: "Dib Abderrahim", position: "Brand Designer", color: "#69C3FF", parentId: 2 },
  { id: 5, name: "Kebbas Aymen", position: "Development Manager", color: "#FFE17B", parentId: 1 },
  { id: 6, name: "Bettayeb Chaimaa", position: "Production Manager", color: "#B4B4FF", parentId: 1 },
];

const createNodesAndEdges = (data: User[]) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const VERTICAL_SPACING = 200;
  const HORIZONTAL_SPACING = 250;

  const getNodesAtLevel = (level: number): User[] => {
    if (level === 0) return data.filter(user => !user.parentId);
    return data.filter(user => {
      const parent = data.find(p => p.id === user.parentId);
      return parent && getNodeLevel(parent) === level - 1;
    });
  };

  const getNodeLevel = (node: User): number => {
    let level = 0;
    let current = node;
    while (current.parentId) {
      level++;
      current = data.find(n => n.id === current.parentId)!;
    }
    return level;
  };

  const positionNodesAtLevel = (level: number) => {
    const levelNodes = getNodesAtLevel(level);
    const totalWidth = (levelNodes.length - 1) * HORIZONTAL_SPACING;
    const startX = -totalWidth / 2;

    levelNodes.forEach((node, index) => {
      const x = startX + (index * HORIZONTAL_SPACING);
      const y = level * VERTICAL_SPACING;

      nodes.push({
        id: node.id.toString(),
        position: { x, y },
        data: {
          label: (
            <div className="flex flex-col items-center p-4">
              <div className="bg-white rounded-lg shadow-md pl-2 pr-2 pb-3 w-48 relative">
                <div 
                  className="w-12 h-12 rounded-full absolute -top-6 left-1/2 transform -translate-x-1/2"
                  style={{ 
                    backgroundColor: node.color,
                    border: '3px solid white', 
                  }}
                />
                <div className="mt-8">
                  <p className="font-semibold text-gray-800 text-center mb-1">{node.name}</p>
                  <p className="text-sm text-gray-500 text-center">{node.position}</p>
                </div>
              </div>
            </div>
          ),
        },
        style: {
          background: 'transparent',
          border: 'none',
        },
      });

      if (node.parentId) {
        edges.push({
          id: `e${node.parentId}-${node.id}`,
          source: node.parentId.toString(),
          target: node.id.toString(),
          type: "smoothstep",
          style: { 
            stroke: "#434893",
            strokeWidth: 2,
          },
        });
      }
    });
  };

  // Position nodes level by level
  const maxLevel = Math.max(...data.map(getNodeLevel));
  for (let level = 0; level <= maxLevel; level++) {
    positionNodesAtLevel(level);
  }

  return { nodes, edges };
};

const HierarchyTree: React.FC = () => {
  const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges(hierarchyData);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ height: '600px' }} className="w-full bg-gray-100 rounded-md">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
        className="hierarchy-flow"
        fitViewOptions={{ padding: 0.1 }}
        minZoom={0.4}
        maxZoom={1.5}
      >
        <Background 
          
          gap={12}
          size={1}
          color="#9CA3AF"
        />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default HierarchyTree;