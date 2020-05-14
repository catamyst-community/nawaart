import React, { useState } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import axios from "axios";
import { getToken } from "../utils/token";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const Form = styled.form`
  width: 900px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const Label = styled.label`
  font-weight: 700;
`;

const Input = styled.input`
  font-size: 1.5rem;
  padding: 10px;
`;

const TextArea = styled.textarea`
  font-size: 1.5rem;
  padding: 10px;
  height: 200px;
`;

const AddArtist = (props) => {
  const [artist, setArtist] = useState({
    name: "",
    photo: "",
    biography: {
      about: "",
      exhibitions: [""],
    },
  });

  const url = process.env.REACT_APP_API_URL + "/artists";

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(url, artist, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      });
      if (response.data.artist) {
        props.history.push(`/artists/${response.data.artist.slug}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormContainer>
      <h1>Add New Artist</h1>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            type="text"
            placeholder="Artist's Name"
            value={artist.name}
            onChange={(event) => {
              setArtist({
                ...artist,
                name: event.target.value,
              });
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="photo">Photo</Label>
          <Input
            name="photo"
            type="text"
            placeholder="https://example.com/photo.jpg"
            value={artist.photo}
            onChange={(event) => {
              setArtist({
                ...artist,
                photo: event.target.value,
              });
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="about">About</Label>
          <TextArea
            name="about"
            value={artist.biography.about}
            onChange={(event) => {
              setArtist({
                ...artist,
                biography: {
                  ...artist.biography,
                  about: event.target.value,
                },
              });
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="exhibitions">Exhibitions</Label>
          <Input
            type="text"
            name="exhibitions"
            value={artist.biography.exhibitions[0]}
            onChange={(event) => {
              setArtist({
                ...artist,
                biography: {
                  ...artist.biography,
                  exhibitions: [event.target.value],
                },
              });
            }}
          />
        </FormGroup>

        <FormGroup>
          <Input type="submit" value="Add Artist" />
        </FormGroup>
      </Form>
    </FormContainer>
  );
};

export default withRouter(AddArtist);
