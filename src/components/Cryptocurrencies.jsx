import React, { useEffect, useState } from "react";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../components/services/CryptoApi.js";
import { Link } from "react-router-dom";
import millify from "millify";
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const filtredData = cryptosList?.data?.coins.filter((el) =>
      el.name.toLowerCase().includes(search.toLowerCase())
    );

    setCryptos(filtredData);
  }, [cryptosList, search]);

  if (isFetching) return "Loading... ";
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((el) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={el.uuid}>
            <Link key={el.uuid} to={`/crypto/${el.uuid}`}>
              <Card
                title={`${el.rank} ${el.name}`}
                extra={<img className="crypto-image" src={el.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(el.price)}</p>
                <p>MarketCap: {millify(el.marketCap)}</p>
                <p>Daily Change: {millify(el.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
