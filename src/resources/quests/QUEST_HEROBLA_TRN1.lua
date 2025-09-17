QUEST_HEROBLA_TRN1 = {
	title = 'IDS_PROPQUEST_INC_001423',
	character = 'MaDa_Corel',
	end_character = 'MaDa_Corel',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_MERCENARY' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_QUE_MASNOMINATE', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		monsters = {
			{ id = 'MI_DRILLER2', quantity = 20 },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001424',
			'IDS_PROPQUEST_INC_001425',
			'IDS_PROPQUEST_INC_001426',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001427',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001428',
		},
		completed = {
			'IDS_PROPQUEST_INC_001429',
			'IDS_PROPQUEST_INC_001430',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001431',
		},
	}
}
