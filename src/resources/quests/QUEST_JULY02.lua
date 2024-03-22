QUEST_JULY02 = {
	title = 'IDS_PROPQUEST_INC_002082',
	character = 'MaFl_July02',
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
			{ id = 'II_SYS_SYS_SCR_BXLOVE01', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_SCR_BXHEART01', quantity = 50, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002083',
			'IDS_PROPQUEST_INC_002084',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002085',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002086',
		},
		completed = {
			'IDS_PROPQUEST_INC_002087',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002088',
		},
	}
}
