import { NextPage } from "next";
import FileUpload from "./components/FileUpload";



interface PageProps {}

const UploadPage: NextPage<PageProps> = ({}) => {

    return (
        <>
            <main
                className={`min-h-screen p-14 w-full bg-[#f7f7f9]`}
            >
                <FileUpload />
            </main>
        </>
    )
}


export default UploadPage;
