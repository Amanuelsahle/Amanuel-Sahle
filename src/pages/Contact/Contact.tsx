import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Form, Input, Button, notification, Typography } from "antd";
import { SiGithub } from "react-icons/si";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { TbBrandTelegram } from "react-icons/tb";
import styles from "./Contact.module.css";

type NotificationType = "success" | "error";

type FieldType = {
  name?: string;
  email?: string;
  message?: string;
};

const { Title, Text } = Typography;
const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    title: string,
    description: string,
  ) => {
    api[type]({
      title,
      description,
    });
  };

  const onFinish = async (values: FieldType) => {
    setLoading(true);
    try {
      await emailjs.send(
        "service_pg28bht",
        "template_dkzb9lv",
        values,
        import.meta.env.VITE_MAILJS_PUBLIC_KEY,
      );

      openNotificationWithIcon(
        "success",
        "Success",
        "Message sent successfully",
      );

      form.resetFields(); // Clear form inputs on success
    } catch (error) {
      console.error("EmailJS Error details:", error);

      openNotificationWithIcon(
        "error",
        "Something went wrong",
        "Please try again later",
      );
    } finally {
      setLoading(false);
    }
  };

  function copyNumber() {
    navigator.clipboard.writeText("+251937291859");
    openNotificationWithIcon("success", "Phone", "Phone number copied");
  }

  return (
    <>
      {contextHolder}
      <div className={styles.contact} id="Contact-Me">
        <Title level={3} className={styles.title}>
          Contact-me
        </Title>
        <Title className={styles.subtitle}>
          Let's Chat Tell me about your Project
        </Title>
        <div className={styles.container}>
          <div className={styles.cardContainerAndTitle}>
            <Text strong>Let's create something together</Text>
            <div className={styles.cardContainer}>
              <a
                className={styles.card}
                href="mailto:amanuelsahile2007@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <div className={styles.icon}>
                  <HiOutlineMail size={20} color="white" />
                </div>
                <div className={styles.contactInfo}>
                  <Text strong>Email</Text>
                  <Text type="secondary">go to email</Text>
                </div>
              </a>
              <a
                className={styles.card}
                href="https://github.com/Amanuelsahle"
                target="_blank"
                rel="noreferrer"
              >
                <div className={styles.icon}>
                  <SiGithub size={20} color="white" />
                </div>
                <div className={styles.contactInfo}>
                  <Text strong>Git Hub</Text>
                  <Text type="secondary">go to git hub</Text>
                </div>
              </a>
              <a
                className={styles.card}
                href="https://t.me/amanuel_sahle"
                target="_blank"
                rel="noreferrer"
              >
                <div className={styles.icon}>
                  <TbBrandTelegram size={20} color="white" />
                </div>
                <div className={styles.contactInfo}>
                  <Text strong>Telegram</Text>
                  <Text type="secondary">go to telegram</Text>
                </div>
              </a>

              <div className={styles.card} onClick={copyNumber}>
                <div className={styles.icon}>
                  <BsTelephone size={20} color="white" />
                </div>
                <div className={styles.contactInfo}>
                  <Text strong>Phone</Text>
                  <Text type="secondary">copy phone number</Text>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <Text strong>Send a message</Text>

            <Form
              form={form}
              layout="vertical"
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Full Name"
                name="name"
                rules={[
                  { required: true, message: "Please input your full name!" },
                ]}
              >
                <Input size="large" placeholder="john doe" disabled={loading} />
              </Form.Item>

              <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email address!",
                    type: "email",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="johndoe@gmail.com"
                  disabled={loading}
                />
              </Form.Item>
              <Text strong>Tell me more about your project</Text>

              <Form.Item<FieldType>
                label="Message"
                name="message"
                rules={[
                  { required: true, message: "Please input your message!" },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="i want to build e-commerce website..."
                  allowClear
                  disabled={loading}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className={styles.button}
                  loading={loading}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
