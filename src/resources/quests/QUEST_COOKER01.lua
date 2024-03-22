QUEST_COOKER01 = {
	title = 'IDS_PROPQUEST_INC_001928',
	character = 'MaFl_Cooker01',
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
			{ id = 'II_SYS_SYS_SCR_BXCHOCOLATE01', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_EVE_CHOCOLATE01', quantity = 10, sex = 'Any', remove = true },
			{ id = 'II_GEN_FOO_INS_MILK', quantity = 10, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001929',
			'IDS_PROPQUEST_INC_001930',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001931',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001932',
		},
		completed = {
			'IDS_PROPQUEST_INC_001933',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001934',
		},
	}
}
