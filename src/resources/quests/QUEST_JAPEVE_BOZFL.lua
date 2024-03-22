QUEST_JAPEVE_BOZFL = {
	title = 'IDS_PROPQUEST_INC_000628',
	character = 'MaFl_Furan',
	end_character = '',
	start_requirements = {
		min_level = 1,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_BIN_BOZFLARIS', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_GRPFLARIS', quantity = 20, sex = 'Any', remove = true },
		},
	},
	drops = {
		{
			item_id = 'II_SYS_SYS_QUE_GRPFLARIS',
			probability = '750000000',
			monsters = {
				'MI_AIBATT1',
				'MI_AIBATT2',
				'MI_AIBATT3',
				'MI_AIBATT4',
				'MI_MUSHPANG1',
				'MI_MUSHPANG2',
				'MI_MUSHPANG3',
				'MI_MUSHPANG4',
				'MI_BURUDENG1',
				'MI_BURUDENG2',
				'MI_BURUDENG3',
				'MI_BURUDENG4',
				'MI_PUKEPUKE1',
				'MI_PUKEPUKE2',
				'MI_PUKEPUKE3',
				'MI_PUKEPUKE4',
				'MI_PEAKYTURTLE1',
				'MI_PEAKYTURTLE2',
				'MI_PEAKYTURTLE3',
				'MI_PEAKYTURTLE4',
				'MI_DEMIAN1',
				'MI_DEMIAN2',
				'MI_DEMIAN3',
				'MI_DEMIAN4',
				'MI_DORIDOMA1',
				'MI_DORIDOMA2',
				'MI_DORIDOMA3',
				'MI_DORIDOMA4',
				'MI_LAWOLF1',
				'MI_LAWOLF2',
				'MI_LAWOLF3',
				'MI_LAWOLF4',
				'MI_FEFERN1',
				'MI_FEFERN2',
				'MI_FEFERN3',
				'MI_FEFERN4',
				'MI_NYANGNYANG1',
				'MI_NYANGNYANG2',
				'MI_NYANGNYANG3',
				'MI_NYANGNYANG4',
				'MI_BANG1',
				'MI_BANG2',
				'MI_BANG3',
				'MI_BANG4'
			}
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000629',
			'IDS_PROPQUEST_INC_000630',
			'IDS_PROPQUEST_INC_000631',
			'IDS_PROPQUEST_INC_000632',
			'IDS_PROPQUEST_INC_000633',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000634',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000635',
		},
		completed = {
			'IDS_PROPQUEST_INC_000636',
			'IDS_PROPQUEST_INC_000637',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000638',
			'IDS_PROPQUEST_INC_000639',
		},
	}
}
