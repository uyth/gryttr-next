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
  const [checkedAreas, setCheckedAreas] = useState(state.areas);
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
    setCheckedAreas(state.areas);
  }, [state.areas])

  const commitChanges = (checkedKeys) => {
    let parents = treeData.reduce((acc, area) => {
      acc.push(area.key);
      return acc;
    }, [])
    let childAreas = checkedKeys.filter(area => !parents.includes(area));
    setCheckedAreas(childAreas);
    dispatch({ "type": "UPDATE_AREA", value: childAreas })
    dispatch({ "type": "FETCH_BOULDERS", query: state.query, areas: childAreas })
  }

  const onExpand = expandedKeys => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = checkedAreas => {
    console.log('onCheck', checkedAreas);
    commitChanges(checkedAreas);
  };

  const onSelect = (checkedAreas, info) => {
    console.log('onSelect', info);
    commitChanges(checkedAreas);
  };

  return (
    <>
    {treeData.length ? (
      <Tree
        checkable
        selectable={false}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedAreas}
        onSelect={onSelect}
        selectedKeys={checkedAreas}
        treeData={treeData}
        style={{fontSize: 18}}
      /> 
    )
      : <Spin/>
    }
    </>

  )
}