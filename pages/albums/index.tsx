import { Box, Button, Card, Grid, TextField } from "@mui/material";

import React from "react";

import MainLayout from "../../layouts/MainLayout";



const Index = () => {
    
    return (
        <MainLayout title={"Список альбомов - музыкальная платформа"}>
            <Grid container justifyContent='center' >
                <Card style={{ width: '900px' }}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>В разработке...</h1>
                           
                        </Grid>
                    </Box>
                    
                </Card>
            </Grid>
        </MainLayout>
    )
}

export default Index;
