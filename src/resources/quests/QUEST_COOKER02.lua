QUEST_COOKER02 = {
	title = 'IDS_PROPQUEST_INC_001937',
	character = 'MaFl_Cooker02',
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
			{ id = 'II_SYS_SYS_SCR_BXCHOCOLATE02', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_SCR_BXCHOCOLATE01', quantity = 50, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001938',
			'IDS_PROPQUEST_INC_001939',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001940',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001941',
		},
		completed = {
			'IDS_PROPQUEST_INC_001942',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001943',
		},
	}
}
