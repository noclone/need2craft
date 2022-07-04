import classes from "./ProfileMenu.module.css"

function ProfileMenu(props){
  
  return (
    <div className={classes.dropdown} >
      <div className={classes.menu_item} onClick={() => {props.disconnect(); props.close()}}>
        <div>Disconnect</div>
      </div>
    </div>
  )
}

export default ProfileMenu;