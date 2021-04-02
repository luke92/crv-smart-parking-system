import React from 'react'
import styled from 'styled-components'

const CardContainer = styled.div`
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
	font-size: 14px;
	font-family: ${({ theme }) => theme.fonts.roboto};
	color: ${({ theme }) => theme.colors.black};
`
// Define our button, but with the use of props.theme this time
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "blue" : "white"};
  color: ${props => props.primary ? "white" : "blue"};

  font-size: 1em;
  margin: 1em;
  border: 2px solid blue;
  border-radius: 3px;
`;
class CardImage extends React.Component {

	render () {

		let title2
		let newLine
		if(this.props.title2){
			title2 = <Title><small>{this.props.title2}</small></Title>
			newLine = <br/>
		}

		let image
		if(this.props.imagedata){
			image = <img className="img-fluid" src={`${this.props.imagedata}`} alt={this.props.title}/>
		}
		else{
			image = <svg width="150px" height="150px" viewBox="0 0 16 16" className="bi bi-camera-video-off" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd" d="M10.961 12.365a1.99 1.99 0 0 0 .522-1.103l3.11 1.382A1 1 0 0 0 16 11.731V4.269a1 1 0 0 0-1.406-.913l-3.111 1.382A2 2 0 0 0 9.5 3H4.272l.714 1H9.5a1 1 0 0 1 1 1v6a1 1 0 0 1-.144.518l.605.847zM1.428 4.18A.999.999 0 0 0 1 5v6a1 1 0 0 0 1 1h5.014l.714 1H2a2 2 0 0 1-2-2V5c0-.675.334-1.272.847-1.634l.58.814zM15 11.73l-3.5-1.555v-4.35L15 4.269v7.462zm-4.407 3.56l-10-14 .814-.58 10 14-.814.58z"/>
		  </svg>;
		}

		let thirdButton
		let permissions = localStorage.getItem('permissions');
		if (permissions) {
			permissions = permissions.split(',')
		}
		if (this.props.onConfigure) {
			thirdButton = <Button className="btn btn-secondary btn-sm m-2" onClick={this.props.onConfigure}>{this.props.action3}</Button>;
			if (this.props.permission3 && permissions) {
				if (permissions.indexOf(this.props.permission3) === -1) {
					thirdButton = ''
				}
			}
		}

		let fourthButton
		if (this.props.onViewStates && this.props.permission4) {
			fourthButton = <Button className="btn btn-secondary btn-sm m-2" onClick={this.props.onViewStates}>{this.props.action4}</Button>;
			if (this.props.permission4 && permissions) {
				if (permissions.indexOf(this.props.permission4) === -1) {
					fourthButton = ''
				}
			}
		}

		let secondButton
		if (this.props.onEdit) {
			secondButton = <Button className="btn btn-secondary btn-sm m-2" onClick={this.props.onEdit}>{this.props.action2}</Button>;
			if (this.props.permission2 && permissions) {
				if (permissions.indexOf(this.props.permission2) === -1) {
					secondButton = ''
				}
			}
		}

		let firstButton = <Button className="btn btn-secondary btn-sm m-2" onClick={this.props.onClick}>{this.props.action1}</Button>
		if (this.props.permission1 && permissions) {
			if (permissions.indexOf(this.props.permission1) === -1) {
				firstButton = ''
			}
		}

		return (
			<div className={this.props.className}>
				<CardContainer >
					<div className="card-body pull-left pl-0 col-lg-7 col-md-12 d-inline-block">
						<Title>{this.props.title}</Title><br/>
						{title2}{newLine}
						<Content>{this.props.content}</Content>
						<div>
							{firstButton}
							{secondButton}
							{thirdButton}
							{fourthButton}
						</div>
					</div>
					<div className="card-img-left pull-right pl-0 col-lg-5 col-md-12 d-inline-block align-top">
						{image}
					</div>
				</CardContainer>
			</div>

		)

	}
}

export default CardImage