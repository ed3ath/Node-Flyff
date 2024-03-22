QUEST_TEACHER03 = {
	title = 'IDS_PROPQUEST_INC_001919',
	character = 'MaFl_Teacher03',
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
			{ id = 'II_SYS_SYS_SCR_BXSCHOOL03', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_EVE_SCHOOL01', quantity = 300, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001920',
			'IDS_PROPQUEST_INC_001921',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001922',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001923',
		},
		completed = {
			'IDS_PROPQUEST_INC_001924',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001925',
		},
	}
}
