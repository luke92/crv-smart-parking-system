import React from 'react'
import styled from 'styled-components'

const CardContainer = styled.div`
	height: 180px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	margin-bottom: 20px;
	border-radius: 3px;
	background-color: ${({ theme }) => theme.colors.white};
	-webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3);
	-moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3);
	box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3);
`

const Title = styled.label`
	font-size: 20px;
	font-family: ${({ theme }) => theme.fonts.roboto};
	color: ${({ theme }) => theme.colors.black};
`

const Content = styled.label`
	font-size: 20px;
	font-family: ${({ theme }) => theme.fonts.roboto};
	color: ${({ theme }) => theme.colors.black};
`

const Card = props => (
	<div className={props.className}>
		<CardContainer>
			<Title className="col-md-10">{props.title}</Title>
			<Content className="col-md-2 text-right">{props.content}</Content>
		</CardContainer>
	</div>

)

export default Card