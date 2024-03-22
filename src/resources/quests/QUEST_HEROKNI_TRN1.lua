QUEST_HEROKNI_TRN1 = {
	title = 'IDS_PROPQUEST_INC_001361',
	character = 'MaDa_Karanduru',
	end_character = 'MaDa_Karanduru',
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
			'IDS_PROPQUEST_INC_001362',
			'IDS_PROPQUEST_INC_001363',
			'IDS_PROPQUEST_INC_001364',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001365',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001366',
		},
		completed = {
			'IDS_PROPQUEST_INC_001367',
			'IDS_PROPQUEST_INC_001368',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001369',
		},
	}
}
