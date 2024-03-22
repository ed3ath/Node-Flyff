QUEST_JULY01 = {
	title = 'IDS_PROPQUEST_INC_002073',
	character = 'MaFl_July01',
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
			{ id = 'II_SYS_SYS_SCR_BXHEART01', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_EVE_BLUETANZAKU', quantity = 10, sex = 'Any', remove = true },
			{ id = 'II_SYS_SYS_EVE_PINKTANZAKU', quantity = 10, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002074',
			'IDS_PROPQUEST_INC_002075',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002076',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002077',
		},
		completed = {
			'IDS_PROPQUEST_INC_002078',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002079',
		},
	}
}
