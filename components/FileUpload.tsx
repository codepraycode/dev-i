'use client'

import { DocumentDuplicateIcon, XMarkIcon } from "@heroicons/react/24/solid"
import copy from "copy-to-clipboard"
import Image from "next/image"
import { FormEvent, useCallback, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { toast, ToastContainer } from "react-toastify"




const sendPostRequest = async (formData: FormData) => {
    const response = await fetch('http://localhost:3040/upload', {
        method: 'post',
        body: formData,
    });

    const {data} = await response.json();

    return data;
}



const FileUpload = () => {
    const [files, setFiles] = useState<any[]>([])
    const [rejected, setRejected] = useState<any[]>([])
    const [fileLink, setFileLink] = useState<Record<string, any>>({})

    const onDrop = useCallback((acceptedFiles: any[], rejectedFiles: any[]) => {
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [
                // If allowing multiple files
                ...previousFiles,
                ...acceptedFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            ]);
        }

        if (rejectedFiles?.length) {
            setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
        }
    }, []);

    const removeFile = (name:string) => {
        setFiles(files => files.filter(file => file.name !== name))
    }

    const removeAll = () => {
        setFiles([])
        setRejected([])
    }

    const removeRejected = (name:string) => {
        setRejected(files => files.filter(({ file }) => file.name !== name))
    }


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': []
        },
        maxSize: 1024 * 1000,
        maxFiles: 1,
        onDrop
    });

    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();

        // const file = files[0]


        if (files.length < 1) return
        
        try {
            const data = await toast.promise(
                Promise.all(files.map(async (file)=>{
                    const formData = new FormData();
                    formData.append('file', file);
        
        
                    const dt = await sendPostRequest(formData)
        
                    return {
                        name: file.name,
                        link: dt
                    }
                })),
                {
                    pending: "Uploading file",
                    success: "Uploaded File",
                    error: "Could not upload file"
                }
            )

            if (Object.keys(data).length > 1) {

                setFileLink((p)=>{

                    const up = {...p}

                    data.forEach((dt)=>{
                        up[dt.name] = dt.link;
                    });

                    return up;
                })
            };
        } catch (error) {
            console.error(error);
            // alert('Error uploading file'); // Inform user about error
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="w-[800px]" style={{maxWidth:"100%", marginInline:"auto"}}>
                <div
                    // className=
                    // id="dropzone"
                    {...getRootProps({
                        className: "relative border-2 border-gray-300 border-dashed rounded-lg p-6"
                    })}
                >
                    {/* <input
                        {...getInputProps({name: "file"})}
                    /> */}

                    <div className="text-center">
                        <Image
                            className="mx-auto h-12 w-12"
                            src="https://www.svgrepo.com/show/357902/image-upload.svg"
                            alt="Upload image"
                            width={100}
                            height={100}
                        />

                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                            <label 
                                htmlFor="file-upload"
                                className="relative cursor-pointer"
                            >
                                <span>Drag and drop</span>
                                <span className="text-indigo-600"> or browse</span>
                                <span>to upload</span>
                                <input
                                    {...getInputProps({name: "file"})}
                                />
                            </label>
                        </h3>
                        <p className="mt-1 text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                        </p>
                    </div>

                </div>
                <section className='mt-10'>
                    <div className='flex gap-4'>
                        {/* <h2 className='title text-3xl font-semibold'>Preview</h2> */}
                        
                        <button
                            type='button'
                            onClick={removeAll}
                            className='mt-1 rounded-md border border-rose-400 px-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-rose-400 hover:text-white'
                        >
                            Remove all files
                        </button>

                        <button
                            type='submit'
                            className='ml-auto mt-1 rounded-md border border-purple-400 px-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-purple-400 hover:text-white'
                        >
                            Upload to Cloud
                        </button>
                    </div>

                        {/* Accepted files */}
                    <h3 className='title mt-10 border-b pb-3 text-lg font-semibold text-stone-600'>
                        Accepted Files
                    </h3>
                    
                    <ul className='mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
                        {files.map(file => {

                            const link = fileLink[file.name];


                            return (
                                <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
                                    <Image
                                        src={file.preview}
                                        alt={file.name}
                                        width={100}
                                        height={100}
                                        onLoad={() => {
                                            URL.revokeObjectURL(file.preview)
                                        }}
                                        className='h-full w-full rounded-md object-contain'
                                    />
                                    <button
                                        type='button'
                                        className='absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border border-rose-400 bg-rose-400 transition-colors hover:bg-white'
                                        onClick={() => link ? copy(link) : removeFile(file.name)}
                                    >
                                        

                                        {
                                            link ? 
                                                <DocumentDuplicateIcon className='h-5 w-5 fill-white transition-colors hover:fill-rose-400' /> :
                                                <XMarkIcon className='h-5 w-5 fill-white transition-colors hover:fill-rose-400' />
                                        }
                                        
                                    </button>

                                    <p className='mt-2 text-[12px] font-medium text-stone-500'>
                                        {file.name}
                                    </p>
                                </li>
                            )})
                        }
                    </ul>

                    {/* Rejected Files */}
                    <h3 className='title mt-24 border-b pb-3 text-lg font-semibold text-stone-600'>
                    Rejected Files
                    </h3>

                    <ul className='mt-6 flex flex-col'>
                        {rejected.map(({ file, errors }) => (
                            <li key={file.name} className='flex items-start justify-between'>
                            <div>
                                <p className='mt-2 text-sm font-medium text-stone-500'>
                                {file.name}
                                </p>
                                <ul className='text-[12px] text-red-400'>
                                {errors.map((error: any) => (
                                    <li key={error.code}>{error.message}</li>
                                ))}
                                </ul>
                            </div>
                            <button
                                type='button'
                                className='mt-1 rounded-md border border-rose-400 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-rose-400 hover:text-white'
                                onClick={() => removeRejected(file.name)}
                            >
                                remove
                            </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </form>

            <ToastContainer />
        </>
    )
}

export default FileUpload;
