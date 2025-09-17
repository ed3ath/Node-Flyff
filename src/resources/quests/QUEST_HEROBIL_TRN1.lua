QUEST_HEROBIL_TRN1 = {
	title = 'IDS_PROPQUEST_INC_001482',
	character = 'MaDa_Ride',
	end_character = 'MaDa_Ride',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_ASSIST' },
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
			'IDS_PROPQUEST_INC_001483',
			'IDS_PROPQUEST_INC_001484',
			'IDS_PROPQUEST_INC_001485',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001486',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001487',
		},
		completed = {
			'IDS_PROPQUEST_INC_001488',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001489',
		},
	}
}
