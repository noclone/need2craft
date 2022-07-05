function BackDrop(props){
  return <div onClick={props.onClick} className={props.backdrop}></div>
}

export default BackDrop;