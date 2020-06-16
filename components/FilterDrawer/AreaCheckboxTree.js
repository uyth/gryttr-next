import React, { useState, useContext, useEffect } from 'react';
import { store } from '../../src/store.js';
import axios from "axios"
import { Tree, Spin } from 'antd';

const { TreeNode } = Tree;

export default function CheckboxTree() {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  
  useEffect(() => {
    const fetchAreas = async () => {
      const result = await axios("api/areas");
      if (result.data["areas"]) {
        setTreeData(result.data.areas);
      }
    };
    fetchAreas();
  }, [])

  useEffect(() => {
    dispatch({ "type": "UPDATE_AREA", value: checkedKeys})
    dispatch({ "type": "FETCH_BOULDERS", query: state.query, areas: checkedKeys })
  }, [checkedKeys])

  const onExpand = expandedKeys => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    setCheckedKeys(checkedKeys);
  };

  const onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeys);
  };
  
  return (
    <>
    {treeData.length ? (
      <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
      /> 
    )
      : <Spin/>
    }
    </>

  )
}