import { NextPage } from "next";
import FileUpload from "@/components/FileUpload";
import Header from "@/components/Header";
import { Button, Card, Divider, Form, Input, InputRef, Select, Space } from "antd";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useRef, useState } from "react";
import { CloseOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";


let index = 0;
interface PageProps {}


const UploadPage: NextPage<PageProps> = ({}) => {

    const [form] = Form.useForm();

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': []
        },
        maxSize: 1024 * 1000,
        maxFiles: 1,
        onDrop: (val:any)=>console.log(val),
    });


    const onFormChange = (value:any) => {
        console.log(value);
    };

    const [skills, setSkills] = useState<string[]>([]);
    const [name, setName] = useState('');
    const inputRef = useRef<InputRef>(null);

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setSkills((s)=>[...s, name || `New item ${index++}`]);
        setName('');
        setTimeout(() => {
        inputRef.current?.focus();
        }, 0);
    };




    return (
        <>
            <Header />
            <br/><br/><br/>


            <section className="container" >

                <h1>Welcome! To get index, please provide your information</h1>
                <br/><br/>


                <Form
                    layout="vertical"
                    form={form}
                    onValuesChange={onFormChange}
                >

                    <Divider orientation="left">Contact Information</Divider>

                    <Form.Item label="Full name">
                        <Input placeholder="input fullname" required/>
                    </Form.Item>
                    <Form.Item label="Email address">
                        <Input placeholder="input email address" type="email" required/>
                    </Form.Item>
                    <Form.Item label="Phone Number">
                        <Input placeholder="input phone number" type="tel" required/>
                    </Form.Item>
                    <Form.Item label="Address">
                        <Input.TextArea placeholder="input address" required/>
                    </Form.Item>

                    <Divider orientation="left">Resume/CV</Divider>
                    

                    <div
                        {...getRootProps({
                            className: "relative border-2 border-gray-300 border-dashed rounded-lg p-6"
                        })}
                    >

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
                                    <span> to upload</span>
                                    <input
                                        {...getInputProps({name: "file"})}
                                    />
                                </label>
                            </h3>
                            <p className="mt-1 text-xs text-gray-500">
                                PDF, DOCX up to 10MB
                            </p>
                        </div>

                    </div>


                    <Divider orientation="left">Skills and Technologies</Divider>

                    <Form.Item >
                        <Select
                            style={{ width: "100%" }}
                            placeholder="Select skills or technology"
                            dropdownRender={(menu) => (
                                <>
                                {menu}
                                <Divider style={{ margin: '8px 0' }} />

                                <Space style={{ padding: '0 8px 4px' }}>
                                    <Input
                                        placeholder="Ad if unlisted"
                                        ref={inputRef}
                                        value={name}
                                        onChange={onNameChange}
                                        onKeyDown={(e) => e.stopPropagation()}
                                    />
                                    <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                        Add item
                                    </Button>
                                </Space>
                                </>
                            )}
                            options={skills.map((item) => ({ label: item, value: item }))}
                        />
                    </Form.Item>


                    <Divider orientation="left">Portfolio</Divider>
                    

                    <Form.List
                        name="names"
                        rules={[
                        {
                            validator: async (_, names) => {
                            // if (!names || names.length < 2) {
                            //     return Promise.reject(new Error('At least 2 passengers'));
                            // }
                            },
                        },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => (
                                <Form.Item
                                    // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    // label={index === 0 ? 'Passengers' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input passenger's name or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input placeholder="Enter link" style={{ width: '95%' }} />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                    ) : null}
                                </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: '60%' }}
                                        icon={<PlusOutlined />}
                                    >
                                        Add link
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>


                    <Divider orientation="left">Work Experience</Divider>
                    <Form.Item>
                        <Input.TextArea placeholder="" required/>
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="btn-submit">
                            Submit
                        </Button>
                    </Form.Item>

                </Form>
            </section>

            <br/><br/><br/>


        </>
    )
}


export default UploadPage;
