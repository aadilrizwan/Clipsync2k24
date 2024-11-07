import React from "react";
import FolderInfo from "../folders/folder-info";
import Videos from "../videos";

type Props = {
  workspaceId: string;
};

const VideoSection = ({workspaceId}: Props) => {
  return (
    <div>
      <Videos
        folderId={workspaceId}
        workspaceId={workspaceId}
        videosKey="videos"
      />
    </div>
  );
};

export default VideoSection;
