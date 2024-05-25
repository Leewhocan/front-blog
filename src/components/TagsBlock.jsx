import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { SideBlock } from "./SideBlock";
import { setSearchTag } from "../redux/slices/posts";
export const TagsBlock = ({ items, isLoading = true }) => {
  const dispath = useDispatch();
  const handleClick = (name) => {
    dispath(setSearchTag(name));
  };
  const { initialTag } = useSelector((state) => state.posts);
  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading
          ? ["loading tags...", "loading tags...", "loading tags..."]
          : items
        )
          .filter((tag) => tag.length > 0)
          .slice(-3)
          .map((name, i) => (
            <div
              style={{ textDecoration: "none", color: "black" }}
              onClick={
                initialTag.tag === name
                  ? () => handleClick("")
                  : () => handleClick(name)
              }
            >
              <ListItem
                sx={
                  initialTag.tag === name
                    ? {
                        backgroundColor: "rgba(67, 97, 238, 0.2)",
                      }
                    : undefined
                }
                key={i}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    <TagIcon />
                  </ListItemIcon>
                  {isLoading ? (
                    <Skeleton width={100} />
                  ) : (
                    <ListItemText primary={name} />
                  )}
                </ListItemButton>
              </ListItem>
            </div>
          ))}
      </List>
    </SideBlock>
  );
};
