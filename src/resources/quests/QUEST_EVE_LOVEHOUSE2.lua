QUEST_EVE_LOVEHOUSE2 = {
	title = 'IDS_PROPQUEST_INC_001316',
	character = 'MaFl_PiPi',
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
			{ id = 'II_SYS_SYS_GEM_NORMBOX', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_GEM_DRYNRT', quantity = 350, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001317',
			'IDS_PROPQUEST_INC_001318',
			'IDS_PROPQUEST_INC_001319',
			'IDS_PROPQUEST_INC_001320',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001321',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001322',
		},
		completed = {
			'IDS_PROPQUEST_INC_001323',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001324',
		},
	}
}
