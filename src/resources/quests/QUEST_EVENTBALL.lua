QUEST_EVENTBALL = {
	title = 'IDS_PROPQUEST_INC_002272',
	character = 'MaFl_EventBall',
	end_character = 'MaFl_EventBall',
	start_requirements = {
		min_level = 1,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_GEN_MAT_ORICHALCUM01', quantity = 5, sex = 'Any' },
			{ id = 'II_GEN_MAT_MOONSTONE', quantity = 5, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_EVE_EVENTBALL01', quantity = 300, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002273',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002274',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002275',
		},
		completed = {
			'IDS_PROPQUEST_INC_002276',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002277',
		},
	}
}
