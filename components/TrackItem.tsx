import { Card, Grid, IconButton } from "@mui/material";
import React from "react";
import { ITrack } from "../types/track";
import styles from '../styles/TrackItem.module.scss'
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useAction } from "../hooks/useAction";
import { deleteTrack, fetchTracks } from "../store/actions-creators/track";
import axios from "axios";
import { useDispatch } from "react-redux";
import { NextTypeDispatch } from "../store";

interface TrackItemProps {
    track: ITrack;
    active?: boolean
}


const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {
    const router = useRouter();
    const {playTrack, pauseTrack, setActiveTrack} = useAction();
    const dispatch = useDispatch() as NextTypeDispatch

    const play = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveTrack(track);
        playTrack();
    }

    const delTrack = async (e: React.MouseEvent) => {
        e.stopPropagation();
       
        try {
            const response = await axios.delete('http://localhost:5000/tracks/' + track._id);
            dispatch(await fetchTracks())
           
        } catch(e) {
            console.log(e)
        }
        
    }

    return (
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton onClick={play}>
                { active
                ? <Pause />
                : <PlayArrow />
                }
            </IconButton>
            <img width={70} height={70} src={'http://localhost:5000/' + track.picture}  />
            <Grid container direction='column' style={{width: 200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
            </Grid>
            {active && <div>2:42 / 3:33</div>}
            <IconButton style={{marginLeft: 'auto'}} onClick={delTrack}>
                <Delete  />
            </IconButton>
        </Card>
    )
}

export default TrackItem;