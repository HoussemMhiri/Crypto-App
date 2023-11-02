import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import { useGetCryptoNewsQuery } from "./services/cryptoNewsApi";
import moment from "moment";
import { useGetCryptosQuery } from "./services/CryptoApi";
const { Text, Title } = Typography;
const { Option } = Select;
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data } = useGetCryptosQuery(100);
  if (!cryptoNews?.value) return "Loading... ";
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase())
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((el) => (
              <Option value={el.name}>{el.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews?.value.map((el, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={el.url} target="_blank" rel="noreferrence">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {el.name}
                </Title>
                <img
                  className="img"
                  src={el?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                />
              </div>
              <p>
                {el.description > 100
                  ? `${el.description.substring(0, 100)}...`
                  : el.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      el.provider[0]?.image?.thumbnail?.contentUrl || demoImage
                    }
                    alt=""
                  />
                  <Text className="provider-name">{el.provider[0]?.name}</Text>
                </div>
                <Text>{moment(el.datePublished).startOf("ss").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
