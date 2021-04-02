let sideBarLinks = [
	{
		icon: ['fa', 'home'],
		title: 'Tablero',
		link: 'home',
		permission: 'view_parkings'
	},
	{
		icon: ['fa', 'chart-bar'],
		title: 'Auditoría',
		link: 'audit',
		permission: 'view_audits'
	},
	/*
	{
		icon: ['fa', 'compass'],
		title: 'Parkings',
		link: 'parkings',
		permission: 'view_parkings'
	},
	*/
	{
		icon: ['fa', 'chart-pie'],
		title: 'Reportes Cubo',
		link: 'reportsCubes',
		permission: 'view_reports'
	},
	{
		icon: ['fa', 'video'],
		title: 'Cámara seguimiento',
		link: 'camera',
		permission: 'view_camaras'
	},
	{
		icon: ['fa', 'video'],
		title: 'Cámara patente',
		link: 'cameraPatent',
		permission: 'view_patents'
	},
	{
		icon: ['fa', 'wrench'],
		title: 'Configurar lugares',
		link: 'configureParkings',
		permission: 'change_parkings'
	},
	{
		icon: ['fa', 'cog'],
		title: 'Configurar patentes',
		link: 'configurePatents',
		permission: 'change_patents'
	},
	{
		icon: ['fa', 'cog'],
		title: 'Administrar usuarios',
		link: 'users',
		permission: 'change_user'
	}
];

export default sideBarLinks;