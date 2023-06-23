import React, { useEffect } from "react";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import useRequestData from "../../hooks/useRequestData";
import Parse from "html-react-parser";
import { Link } from "react-router-dom";

const ViborghaveserviceForside = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const {
    data: dataService,
    isLoading: isLoadingService,
    error: errorService,
    makeRequest: makeRequestService,
  } = useRequestData();

  useEffect(() => {
    makeRequest("http://localhost:5023/aboutus");
    makeRequestService("http://localhost:5023/services");
  }, []);

  return (
    <>
      {isLoading && isLoadingService && <Loader />}

      {error && errorService && <Error />}

      {data && (
        <div className="textcon">
          <section>
            <h1>{data.title}</h1>
            <p>
            {Parse(data.content)}
            </p>
            <Link className="btn">SE ALLE YDELSER</Link>
          </section>
          <section className="cardCon">
            {dataService &&
              dataService.slice(0,2).map((s) => (
                <div key={s._id}>
                  <img src={"http://localhost:5023/images/"+s.image} alt={s.image} />
                  <h3>{s.title}</h3>
                  <p>{s.content}</p>
                </div>
              ))}
          </section>
        </div>
      )}
    </>
  );
};

export default ViborghaveserviceForside;
