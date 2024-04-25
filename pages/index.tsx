import { NextPage } from "next";
import FileUpload from "@/components/FileUpload";

interface PageProps {}

const UploadPage: NextPage<PageProps> = ({}) => {

    return (
        <>
            <FileUpload />
        </>
    )
}


export default UploadPage;
