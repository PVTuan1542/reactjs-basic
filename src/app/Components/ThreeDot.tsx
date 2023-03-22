import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { POST } from "../Model/data";

const ITEM_HEIGHT = 48;

export default function LongMenu(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function deletePost() {
    await axios.delete(`${POST.DELETE_POST}/${props?.id}`);

    props.setPosts((previous: any) => {
    const newPosts = previous.filter((element: any) => element.id !== props?.id);

      return newPosts
    });
    return;
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem
          key="Update"
          onClick={() => {
            handleClose();
            props.toggle();
          }}
        >
          Update
        </MenuItem>
        <MenuItem
          key="Delete"
          onClick={() => {
            deletePost();
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
