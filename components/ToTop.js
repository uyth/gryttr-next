import { BackTop } from "antd";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { FormHelperText } from "@material-ui/core";

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 20,
  backgroundColor: '#1088e9',
  color: '#fff',
  display:"flex",
  justifyContent: "center",
  alignItems: "center"
}

export default function ToTop() {
  return(
    <BackTop>
      <div style={style}><KeyboardArrowUpIcon /></div>
    </BackTop>
  )
}