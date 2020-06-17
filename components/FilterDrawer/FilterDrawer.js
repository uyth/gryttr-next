import { Container } from '@material-ui/core/';
import { Drawer, Divider } from 'antd';

import AreaCheckboxTree from "./AreaCheckboxTree";
import DistanceSlider from "./DistanceSlider";
import GradeSlider from "./GradeSlider";


export default function FilterDrawer({ visible, handleToggleDrawer }) {

  return (
    <Drawer
      title="Filter"
      closable={true}
      placement="bottom"
      visible={visible}
      onClose={handleToggleDrawer}
      height={"70vh"}
    >
      <Container>
        <Divider>Grad</Divider>
        <GradeSlider />
        <Divider>Område</Divider>
        <AreaCheckboxTree />
        <Divider>Avstand</Divider>
        <DistanceSlider />
      </Container>
    </Drawer>
  )
};