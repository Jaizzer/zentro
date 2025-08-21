import createActionList from "./createActionList.mjs";
import sendData from "../sendData.mjs";
import {
	downloadIcon,
	deleteIcon,
	shareIcon,
	moveIcon,
	seeMoreIcon,
	copyLinkIcon,
} from "/icons/actionIcons.mjs";
import createFileDownloadLink from "./createFileDownloadLink.mjs";
import downloadUrl from "./downloadUrl.mjs";

export default function createSelectedFilesTabActionList(getSelectedFiles) {
	const shareAction = {
		actionName: "share",
		icon: shareIcon,
		callback: () => {
			console.log(`Sharing file...`);
		},
	};

	const downloadAction = {
		actionName: "download",
		icon: downloadIcon,
		callback: async () => {
			const selectedFiles = getSelectedFiles();

			const url = "http://localhost:9000/file/getZipFile";

			const { zipFile } = await sendData({
				url: url,
				data: { files: selectedFiles },
			});

			if (zipFile) {
				// Create a download link for the zip file
				const fileDownloadLink = createFileDownloadLink(zipFile);

				// Download the zip file
				downloadUrl({
					url: fileDownloadLink,
					fileName: "zentro-archive.zip",
				});
			} else {
				console.log("Not");
			}
		},
	};

	const moveAction = {
		actionName: "move",
		icon: moveIcon,
		callback: () => {
			console.log(`Moving file...`);
		},
	};

	const deleteAction = {
		actionName: "delete",
		icon: deleteIcon,
		callback: () => {
			console.log(`Deleting file...`);
		},
	};

	const copyLinkAction = {
		actionName: "copyLink",
		icon: copyLinkIcon,
		callback: () => {
			console.log(`Getting the file link...`);
		},
	};

	const seeMoreAction = {
		actionName: "seeMore",
		icon: seeMoreIcon,
		callback: () => {
			console.log(`Opening other actions...`);
		},
	};

	return createActionList([
		shareAction,
		downloadAction,
		moveAction,
		deleteAction,
		copyLinkAction,
		seeMoreAction,
	]);
}
