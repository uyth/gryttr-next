import React, { useState, useContext, useEffect } from 'react';
import { store } from '../../src/store.js';
import axios from "axios"
import { Tree } from 'antd';

const { TreeNode } = Tree;

export default function CheckboxTree() {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const [treeData, setTreeData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("api/areas");
      if (result.data["areas"]) {
        setTreeData(result.data.areas);
      }
      };
    fetchData();
  }, [])

  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    setCheckedKeys(checkedKeys);
    dispatch({ "type": "UPDATE_AREA", value: checkedKeys})
    dispatch({ "type": "FETCH_BOULDERS" })
  };

  const onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeys);
  };
  
  return (
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
}