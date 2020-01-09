import React, {Component} from 'react';
import {Textfit} from 'react-textfit';

import * as actions from "../../store/actions";
import {connect} from "react-redux";
import Time from "../../components/Time/Time";
import {convertObjectstoArray, msToTime, updateObject} from "../../shared/utility";
import {withStyles} from "@material-ui/core";

import ScaleText from "react-scale-text";
import clsx from "clsx";

const styles = theme => ({
    fullWidthText: {
        width: '100%',
        fontSize: '25.5vw',
        padding: 0,
        marginTop: '-8vw',
        marginBottom: '-4vw'
    },
    fullWidthTime: {
        lineHeight: .9,
        width: '100%',
        fontSize: '25.5vw',
        padding: 0,
    },
    currentPartSC: {
        overflowX: 'hidden',
        maxHeight: '40vh',
        width: '100%',
        lineHeight: .9,
        background: '#09d3ac',
        paddingBottom: '1vh 0'
    },
    currentPart: {
        width: '100%',
        height: 'auto',
        lineHeight: 1,
        background: '#09d3ac',
        paddingBottom: '1vh'
    },
    nextCue: {
        lineHeight: 1,
        width: '100%',
        background: '#eeee',
        paddingBottom: '1vh',
        fontStyle: 'italic'
    },
    nextPart: {
        width: '100%',
        height: 'auto',
        lineHeight: 1,
        paddingBottom: '1vh',
        background: '#09d3ac'
    },
    followingPartSC: {
        overflowX: 'hidden',
        maxHeight: '40vh',
        width: '100%',
        lineHeight: .9,
        background: '#cccccc',
        paddingBottom: '1vh',
    },
    root: {
        textAlign: 'center',
    },
    name: {
        width: '100%',
        height: 'auto',
        lineHeight: 1,
        background: '#09d3ac',
        paddingBottom: '1vh'
    },
    textMessage: {
        overflowX: 'hidden',
        lineHeight: .9,
        height: '67vh',
        width: '100%'
    },
    alert: {
        color: 'red'
    }
});

/**
 * Created by Doa on 14-11-2019.
 */
const Monitor = withStyles(styles)(
    ({
         classes, nextPartTitle, nextPartDuration, followingPartCue, followingPartTitle,
         isLive, isPaused, showHasFinished, currentTime, name = 'doa', message, runningPartDuration,
     }) => {

       const isOdd = () => {
           const test = Math.round(currentTime / 1000);
           return test % 2;
       };

        let time = '';

        let timeLeft = nextPartDuration - runningPartDuration;
        time = (timeLeft >= 0) ? msToTime(timeLeft, true) :
            <span className={clsx({
                [classes.alert]: isOdd()})}>TIME UP</span>;

        let body = (
            <div className={classes.currentPart}>
                <Textfit className={classes.nextPart} mode='single'>
                    show will start soon
                </Textfit>
            </div>
        );
        // for multiline tekst use ScaleText
        //  <div className={classes.currentPartSC}>
        //                     <ScaleText >
        //                         {currentPartTitle}
        //                     </ScaleText>
        //                 </div>
        if (isLive) {
            body = (
                <>
                    <div className={classes.currentPart}>
                        <Textfit className={classes.nextPart} mode='single'>
                            {nextPartTitle}
                        </Textfit>
                    </div>
                    <div className={classes.fullWidthText}>
                        {time}
                    </div>
                    <Textfit className={classes.nextCue} mode='single'>
                        {followingPartCue}
                    </Textfit>
                    {(followingPartTitle) ? (
                    <div className={classes.followingPartSC}>
                        <ScaleText>
                            {followingPartTitle}
                        </ScaleText>
                    </div>
                ) : null}

                </>)
        } if(showHasFinished) {
            body = (
                <ScaleText>
                    Show has finished
                </ScaleText>
            )
        }

        if (message) {
            name = '';
            convertObjectstoArray(message.team).map(member => {
                name = name + ' ' + member.firstName
            });
            body =
                (<>
                        <Textfit className={clsx({
                            [classes.name]:true, [classes.alert]: isOdd()})} mode='single'>
                            {name}
                        </Textfit>
                        <div className={clsx({
                            [classes.textMessage]:true, [classes.alert]: !isOdd()})} mode='single'>
                            <ScaleText>
                                {message.message}
                            </ScaleText>
                        </div>
                        <Textfit className={classes.fullWidthTime} mode={'single'}>
                            {time}
                        </Textfit>
                    </>
                )
        }
        return (
            <div className={classes.root}>
                {body}
            </div>)



            //<span className={classes.textMessage}>
            //                     <ScaleText widthOnly maxFontSize={250} minFontSize={10}>
            //                         {message}
            //                     </ScaleText>
            // body = (
            //     <div className={classes.text}>
            //         <Textfit className={classes.text}>
            //             {message}
            //         </Textfit>
            //     </div>)
            // <div className={classes.fullWidthText}>
            //                                         {time}
            //                                          </div>


            // if (this.props.isLive2) {
            //     const currentBlockId = this.props.blocks[this.props.runningBlock].id;
            //     const currentParts = this.props.parts.filter(aPart => aPart.blockId === currentBlockId);
            //     const currentPartSC = currentParts[this.props.runningPart];
            //     const timeLeft = currentPartSC.duration - this.props.runningPartDuration;
            //     time = (timeLeft >= 0) ? msToTime(timeLeft, true) : 'TIME IS UP';
            //     head = (
            //         <Textfit className={classes.CurrentPart} mode='single'>
            //             {currentPartSC.title}
            //         </Textfit>);
            //     if (this.props.runningPart + 1 < currentParts.length) {
            //         const nextPart = currentParts[this.props.runningPart + 1];
            //         if (nextPart.cue)
            //             cue = (
            //                 <Textfit className={classes.Cue} mode='single'>
            //                     {nextPart.cue}
            //                 </Textfit>
            //             );
            //         next = (
            //             <Textfit className={classes.NextPart} mode='single'>
            //                 {nextPart.title}
            //             </Textfit>
            //         )
            //     }
            //
            // }

            ;


    });

// <div className={classes.Wrapper}>
//                 {body}
//                 {head}
//                 <div className={classes.fullWidthText}>
//                     {time}
//                 </div>
//                 {/*flash red when time has passed*/}
//                 {cue}
//                 {next}
//             </div>


const mapDispatchToProps = (dispatch) => {
    return {
        onResetTheShow: (firebase) => dispatch(actions.resetTheShow(firebase))
    }
};

const mapStateToProps = (state) => {
    return {
        currentTime: state.global.currentTime,
        isLive: state.live.isLive,
        isPaused: state.live.isPaused,
        nextPartTitle: state.live.nextPartTitle,
        nextPartDuration: state.live.nextPartDuration,
        followingPartCue: state.live.followingPartCue,
        followingPartTitle: state.live.followingPartTitle,
        showHasFinished: state.live.showHasFinished,
        runningPartDuration: state.live.runningPartDuration,
        message: state.live.monitorMessage
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Monitor)

