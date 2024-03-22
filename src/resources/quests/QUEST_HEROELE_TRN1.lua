QUEST_HEROELE_TRN1 = {
	title = 'IDS_PROPQUEST_INC_001655',
	character = 'MaDa_Horison',
	end_character = 'MaDa_Horison',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_MAGICIAN' },
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
			'IDS_PROPQUEST_INC_001656',
			'IDS_PROPQUEST_INC_001657',
			'IDS_PROPQUEST_INC_001658',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001659',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001660',
		},
		completed = {
			'IDS_PROPQUEST_INC_001661',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001662',
		},
	}
}
