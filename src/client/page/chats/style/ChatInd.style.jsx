import { Button } from '@mui/material'
import styled from 'styled-components'
import { secondary120 } from '../../../../common/variables'

export const ChatIndContainer = styled(Button)`
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    cursor: pointer;
    overflow: hidden;

    &:hover {
        background-color: #83838334!important;
        border-radius: 8px;
    }

    .userImg {
        position: relative;

        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: contain;
        }

        .whiteNote {
            position: absolute;
            left: calc(50% - 5px);
            bottom: 2px;
            width: 10px;
            height: 10px;
            padding: 1px;
            background-color: white;
            border-radius: 50%;
        }
        .greenNoti {
            position: absolute;
            left: calc(50% - 2.5px);
            bottom: 2px;
            width: 6px;
            height: 6px;
            padding: 1px;
            background-color: greenyellow;
            border-radius: 50%;
        }
    }

    .chatInfo {
        width: 100%;
        overflow: hidden;
        text-transform: none;

        .userChatInfo {
                span {
                    font-size: 18px;
                    font-weight: 500;
                }
                p {
                    font-size: 14px;
                    word-wrap: break-word;
                    color: #928f8f;
                    width: 100%;
                }
            }

        .timenoti {
            display: flex;
            flex-direction: column;
            text-align: center;
            align-items: center;

            span:nth-child(2) {
                display: inline-block;
                width: 20px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                border-radius: 50%;
                background-color: ${secondary120};
                color: white;
            }
        }
    }
`
