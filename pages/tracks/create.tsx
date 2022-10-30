import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FileUpload from "../../components/FileUpload";
import StepWrapper from "../../components/StepWrapper";
import { useInput } from "../../hooks/useInput";
import MainLayout from "../../layouts/MainLayout";

const Create = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [picture, setPicture] = useState(null);
    const [audio, setAudio] = useState(null);
    const name = useInput('');
    const artist = useInput('');
    const text = useInput('');
    const router = useRouter();

    const next = () => {
        if (activeStep !== 2) {
            setActiveStep(prev => prev + 1);
        } else {
            const formData = new FormData();
            formData.append("name", name.value);
            formData.append("artist", artist.value);
            formData.append("text", text.value);
            formData.append("picture", picture);
            formData.append("audio", audio);
            axios.post('http://localhost:5000/tracks', formData)
                .then(resp => router.push('/tracks'))
                .catch(e => console.log(e));
        }
    }
    const back = () => {
        setActiveStep(prev => prev - 1);
    }
    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
                    <Grid container direction={'column'} style={{ padding: 20 }}>
                        <TextField {...name} label={'Название трека'} style={{ marginTop: 10 }} />
                        <TextField {...artist} label={'Имя исполнителя'} style={{ marginTop: 10 }} />
                        <TextField {...text} label={'Слова к треку'} multiline rows={3} style={{ marginTop: 10 }} />
                    </Grid>
                }
                {activeStep === 1 &&
                    <FileUpload setFile={setPicture} accept='image/*' >
                        <Button>Загрузить изображение</Button>
                    </FileUpload>
                }
                {activeStep === 2 &&
                    <FileUpload setFile={setAudio} accept='audio/*' >
                        <Button>Загрузить трек</Button>
                    </FileUpload>
                }
               
            </StepWrapper>
            <Grid container justifyContent='space-between'>
                <Button disabled={activeStep === 0} onClick={back}>Назад</Button>
                <Button onClick={next}>Далее</Button>
            </Grid>
        </MainLayout>
    )
}

export default Create;