import React, { useEffect, useState } from 'react';
import Error from '../../../components/Error';
import Loader from '../../../components/Loader'
import { useParams } from 'react-router-dom';
import useRequestData from '../../../hooks/useRequestData'

const EditService = () => {
  const { id } = useParams(); //snup parameteren fra url'en (navngives i app.jsx)

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    makeRequest("http://localhost:5023/aboutus");
  }, []);

  //når varen er hentet lægger i data
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
    }
  }, [data]);

  const handleSubmit = (e) => {

    e.preventDefault();

    const formData = new FormData(e.target)

    makeRequest(
      "http://localhost:5023/aboutus/admin",
      {
        "Content-Type":"multipart/form-data"
      },
      null,
      "PUT",formData
    );
  };

  return (
    <>
      <h1>Ret text</h1>
      {isLoading && <Loader />}

      {error && <Error error={error} />}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name='title'
          value={title ? title : ""}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="skriv en titel her"
          required
        />
        <textarea value={content ? content : ""}
          name='content'
          onChange={(e) => setContent(e.target.value)}
          placeholder="skriv en beskrivelse her"
          required cols="30" rows="10">
        </textarea>
        <button type="submit">Ret text</button>
      </form>
    </>
  );
};

export default EditService;
