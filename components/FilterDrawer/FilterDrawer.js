import { Container } from '@material-ui/core/';
import { Typography } from 'antd';
const { Title } = Typography;
import { Drawer } from 'antd';

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
        <>
          <Title level={4}>Grad</Title>
          <GradeSlider />
        </>
        <>
          <Title level={4}>Velg område</Title>
          <AreaCheckboxTree />
        </>
        <>
          <Title level={4}>Avstand fra deg</Title>
          <DistanceSlider />
        </>
      </Container>
    </Drawer>
  )
};