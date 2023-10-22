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
import { useTheme } from "@mui/material/styles";
export const TagsBlock = ({ items, isLoading = true }) => {
  const theme = useTheme();
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
              onClick={() => handleClick(name)}
            >
              <ListItem
                sx={
                  initialTag.tag === name
                    ? {
                        backgroundColor: theme.palette.grey[300], // Добавьте другие стили здесь
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
