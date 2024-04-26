import { NextPage } from "next";
import Header from "@/components/Header";
import { Button,  Divider, Form, Input, Select, Space, UploadProps } from "antd";
import { useState } from "react";
import { CloudUploadOutlined, DribbbleOutlined,
    GithubOutlined, GlobalOutlined,
    LinkedinOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import siteData from "@/data/site.json";
import {message, Upload} from "antd";

interface PageProps {}

const {Dragger} = Upload;


const cityData = {
    Nigeria: ['Lagos(Ikeja)', 'Abuja(FCT)'],
};

type CityName = keyof typeof cityData;

const provinceData: CityName[] = ["Nigeria"];


const UploadPage: NextPage<PageProps> = ({}) => {

    const [form] = Form.useForm();
    const router = useRouter();

    const [skills] = useState<string[]>([]);

    const [country, setCountry] = useState(cityData[provinceData[0] as CityName]);
    const [city, setCity] = useState<CityName | null>(null);

    const handleProvinceChange = (value: CityName) => {
        setCountry(cityData[value]);
        setCity(cityData[value][0] as CityName);
    };

    const onSecondCityChange = (value: CityName) => {
        setCity(value);
    };

    const onFormChange = (value:any) => {
        console.log(value);
    };


    const handleSubmit = (values: any) => {
        console.log("Submitted:", values);

        router.push("/success")
    }


    const uploadProps: UploadProps = {
        name: 'resume',
        multiple: false,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };


    return (
        <>

            <Header />
            <section className="container text-center">
                <h2 className="intro">{siteData.siteIntro}</h2>
            </section>

            <br/><br/><br/><br/>

            <section className="container" >

            

                <h1>Please provide your information</h1>
                <br/>


                <Form
                    layout="vertical"
                    form={form}
                    onValuesChange={onFormChange}
                    action={"/success"}
                    onFinish={handleSubmit}
                >

                    {/* <Divider orientation="left">Contact Information</Divider> */}

                    <div className="input-group">
                        <Form.Item label="First name">
                            <Input placeholder="input fullname" required/>
                        </Form.Item>
                        <Form.Item label="Last address">
                            <Input placeholder="input email address" type="email" required/>
                        </Form.Item>
                    </div>

                    <div className="input-group">

                        <Form.Item label="Email address">
                            <Input placeholder="input email address" type="email" required/>
                        </Form.Item>

                        <Form.Item label="Alias(nickname)">
                            <Input placeholder="Input your nickname" type="text"/>
                        </Form.Item>
                    </div>

                    <div className="input-group">
                        <Form.Item label="Phone Number">
                            <Space.Compact>
                                <Input style={{ width: '20%' }} defaultValue="+234" disabled/>
                                <Input style={{ width: '80%' }} placeholder="other digits" />
                            </Space.Compact>

                        </Form.Item>
                        <Form.Item label="WhatsApp Number">
                            <Space.Compact>
                                <Input style={{ width: '20%' }} defaultValue="+234" disabled/>
                                <Input style={{ width: '80%' }} placeholder="other digits" />
                            </Space.Compact>
                        </Form.Item>
                    </div>



                        
                    <div className="input-group">
                        <Form.Item label="Country">
                            <Select
                                defaultValue={provinceData[0]}
                                // style={{ width: 120 }}
                                onChange={handleProvinceChange}
                                options={provinceData.map((province) => ({ label: province, value: province }))}
                            />
                        </Form.Item>

                        <Form.Item label="State">
                            <Select
                                // style={{ width: 120 }}
                                // defaultValue={cityData[0]}
                                placeholder="-- Select state --"
                                value={city}
                                onChange={onSecondCityChange}
                                options={country.map((city) => ({ label: city, value: city }))}
                            />
                        </Form.Item>
                    </div>


                    <Form.Item label="Skills and Technologies">
                        <Select
                            style={{ width: "100%" }}
                            placeholder="Select skills or technology"
                            mode="tags"
                            tokenSeparators={[',']}
                            // onChange={handleChange}
                            options={skills.map((item) => ({ label: item, value: item }))}
                        />
                    </Form.Item>


                    <Divider orientation="left">Portfolio links</Divider>

                    <div className="input-category">
                        <div className="input-group">
                            <Form.Item>
                                <Input
                                    placeholder="Input link to your github profile/page"
                                    type="text"
                                    prefix={<GithubOutlined />}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Input
                                    placeholder="Input link to your Linkedin profile"
                                    type="text"
                                    prefix={<LinkedinOutlined/>}
                                />
                            </Form.Item>
                        </div>

                        <div className="input-group">
                            <Form.Item>
                                <Input
                                    placeholder="Input link to your portfolio site"
                                    type="text"
                                    prefix={<GlobalOutlined />}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Input
                                    placeholder="Input link to your Dribble profile"
                                    type="text"
                                    prefix={<DribbbleOutlined />}
                                />
                            </Form.Item>
                        </div>
                    </div>



                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                        <CloudUploadOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag your Resume/CV to this area to upload</p>
                        <p className="ant-upload-hint">
                            PDF, DOCS upto 5MB
                        </p>
                    </Dragger>



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
