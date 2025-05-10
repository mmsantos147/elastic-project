import { Content } from "antd/es/layout/layout";
import { Card, Typography, List, Row, Col, Divider } from "antd";
import { InfoCircleOutlined, SearchOutlined } from "@ant-design/icons";
import UAISearch from "../components/UAISearch";
import { useTranslation } from "react-i18next";

const { Title, Paragraph, Text } = Typography;

export const Tips = () => {
  const { t } = useTranslation();

  const tips = [
    {
      keyword: `in_title:X`,
      description: t("in_title_description_1"),
    },
    {
      keyword: `-in_title:X`,
      description: t("in_title_description_2"),
    },
    {
      keyword: `reading_time:N`,
      description: t("reading_time_1"),
    },
    {
      keyword: `reading_time:>N`,
      description: t("reading_time_2"),
    },
    {
      keyword: `reading_time:<N`,
      description: t("readding_time_3"),
    },
    {
      keyword: `reading_time:N..M`,
      description: t("reading_time_4"),
    },
    {
      keyword: `created_at:N`,
      description: t("created_at_1"),
    },
    {
      keyword: `created_at:>N`,
      description: t("created_at_2"),
    },
    {
      keyword: `created_at:<N`,
      description: t("created_at_3"),
    },
    {
      keyword: `created_at:N..M`,
      description: t("created_at_4"),
    },
  ];

  return (
    <Content style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}
      >
        <UAISearch logoWidth={300} />
      </div>

      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Card style={{ height: "100%" }}>
            <Title level={2}>
              <InfoCircleOutlined style={{ marginRight: 8 }} />
              {t("search_tokens")}
            </Title>
            <Paragraph>{t("search_tokens_description")}:</Paragraph>

            <List
              itemLayout="vertical"
              dataSource={tips}
              renderItem={({ keyword, description }) => (
                <List.Item>
                  <Text code>{keyword}</Text>
                  <Paragraph style={{ marginTop: 4 }}>{description}</Paragraph>
                </List.Item>
              )}
            />

            <Paragraph>
              <SearchOutlined style={{ marginRight: 4 }} />
              {t("search_tokens_final")}.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card style={{ height: "100%", textAlign: "left" }}>
            <Title level={2}>
              <InfoCircleOutlined style={{ marginRight: 8 }} />
              {t("usefull_tips")}
            </Title>

            <Paragraph>
              <Text strong>{t("exact_search")}: </Text>
              {t("exact_search_description")}
            </Paragraph>

            <Paragraph>
              <Text code>"{t("artificial_intelligence")}"</Text>{" "}
              {t("exact_search_example")}.
            </Paragraph>
            <Divider />
            <Paragraph>
              <Text strong>{t("term_exclusion")}:</Text>
              {t("term_exclusion_description_1")} (<Text code>-</Text>){" "}
              {t("term_exclusion_description_2")}.
            </Paragraph>

            <Paragraph>
              <Text code>-facebook</Text> {t("term_exclusion_example")}{" "}
              "facebook".
            </Paragraph>

            <Divider />
            <Paragraph>
              <Text strong>{t("smart_search")}:</Text>
              {t("smart_search_description")}:
            </Paragraph>

            <Paragraph>
              <Text code>
                "machine learning" reading_time:&gt;5 -{t("course")}
              </Text>{" "}
              {t("smart_search_example_1")}:
              <ul style={{ paddingLeft: 20 }}>
                <li>{t("smart_search_example_2")} "machine learning"</li>
                <li>{t("smart_search_example_3")}</li>
                <li>{t("smart_search_example_4")}</li>
              </ul>
            </Paragraph>

            <Divider />

            <Paragraph>
              <SearchOutlined style={{ marginRight: 4 }} />
              {t("tips_footer")}.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};
