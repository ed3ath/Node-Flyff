QUEST_RICECAKE4 = {
	title = 'IDS_PROPQUEST_INC_001838',
	character = 'MaFl_Iblis04',
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
			{ id = 'II_SYS_SYS_EVE_GREENBALL', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_EVE_SONGPYUN', quantity = 100, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001839',
			'IDS_PROPQUEST_INC_001840',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001841',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001842',
		},
		completed = {
			'IDS_PROPQUEST_INC_001843',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001844',
		},
	}
}
