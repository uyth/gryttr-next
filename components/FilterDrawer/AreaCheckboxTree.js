import React, { useState, useContext, useEffect } from 'react';
import { store } from '../../src/store.js';
import axios from "axios"
import { Tree, Spin } from 'antd';

const { TreeNode } = Tree;

export default function CheckboxTree() {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const [treeData, setTreeData] = useState([]);
  const [checkedAreas, setCheckedAreas] = useState(state.areas);
  
  useEffect(() => {
    const fetchAreas = async () => {
      const result = await axios("api/areas?country="+state.country);
      if (result.data["areas"]) {
        setTreeData(result.data.areas);
      }
    };
    fetchAreas();
  }, [state.country])

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
  }

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
        defaultExpandAll={true}
        defaultExpandParent={true}
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